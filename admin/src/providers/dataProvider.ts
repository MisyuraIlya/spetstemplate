import { DataProvider, fetchUtils, Identifier, RaRecord } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = '/api/catalog'; // Base URL for your API
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const page = params.pagination?.page || 1;
    const perPage = params.pagination?.perPage || 10;
    const field = params.sort?.field || 'name';
    const order = params.sort?.order || 'asc';
    const query = {
      page,
      perPage,
      sort: field,
      order,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const { headers, json } = await httpClient(url);
    return {
      data: json.data,
      total: json.total,
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return {
      data: json.data,
    };
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json.data,
    };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      page,
      perPage,
      sort: field,
      order,
      [params.target]: params.id,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { headers, json } = await httpClient(url);
    return {
      data: json.data,
      total: json.total,
    };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    };
    const { json } = await httpClient(url, options);
    return {
      data: json.data,
    };
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(params.data),
        })
      )
    );
    return { data: responses.map(({ json }) => json.data.id) };
  },

  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params.data),
    };
    const { json } = await httpClient(url, options);
    return {
      data: json.data,
    };
  },

  delete: async <RecordType extends RaRecord = any>(resource: string, params: { id: Identifier }) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: 'DELETE',
    };
    await httpClient(url, options);
    return { data: { id: params.id } as RecordType };
  },

  deleteMany: async <RecordType extends RaRecord = any>(resource: string, params: { ids: Identifier[] }) => {
    const responses = await Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })
      )
    );
    return { data: params.ids };
  },
};

export default dataProvider;
