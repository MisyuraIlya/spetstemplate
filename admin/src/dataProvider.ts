import { DataProvider, fetchUtils, Identifier, RaRecord } from 'react-admin';
import { stringify } from 'query-string';

const resourceMap = {
  users: 'http://myapp.local/api/auth',
  categories: 'http://myapp.local/api/catalog',
  products: 'http://myapp.local/api/catalog',
  brands: 'http://myapp.local/api/catalog',
};

const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  
  getList: async (resource, params) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
    const page = params.pagination?.page || 1;
    const perPage = params.pagination?.perPage || 10;
    const field = params.sort?.field || 'name';
    const order = params.sort?.order || 'asc';
    const query = {
      page,
      perPage,
      sort: field,
      order,
      ...params.filter
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json.data || [],
      total: json.total || 0,
    };
  },

  getOne: async (resource, params) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return {
      data: json || { id: params.id }, 
    };
  },

  getMany: async (resource, params) => {
    console.log('resource, params',resource, params)
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json.data || [],
    };
  },

  getManyReference: async (resource, params) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
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
    const { json } = await httpClient(url);
    return {
      data: json.data || [],
      total: json.total || 0,
    };
  },

  update: async (resource, params) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    };
    const { json } = await httpClient(url, options);
    return {
      data: json.data || { id: params.id },
    };
  },

  updateMany: async (resource, params) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
    const responses = await Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(params.data),
        })
      )
    );
    return { data: responses.map(({ json }) => json.data?.id || null) };
  },

  create: async (resource, params) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
    const url = `${apiUrl}/${resource}`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params.data),
    };
    const { json } = await httpClient(url, options);
    return {
      data: json.data || { ...params.data, id: json.id || Math.random().toString(36) }, 
    };
  },

  delete: async <RecordType extends RaRecord = any>(resource: string, params: { id: Identifier }) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: 'DELETE',
    };
    await httpClient(url, options);
    return { data: { id: params.id } as RecordType };
  },

  deleteMany: async (resource: string, params: { ids: Identifier[] }) => {
    const apiUrl = (resourceMap[resource as keyof typeof resourceMap] || '/api') as string;
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
