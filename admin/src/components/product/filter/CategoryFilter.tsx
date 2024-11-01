import {FilterList, FilterListItem, useGetList} from 'react-admin';
import StoreIcon from '@mui/icons-material/Store';
import React from 'react';

interface ICategory {
  id: number,
  children: ICategory[],
  name: string,
  position: number
}

const CategoryFilter: React.FC = () => {
  const { data: categories, total, isLoading } = useGetList<ICategory>(
    'categories',
    {
      pagination: { page: 1, perPage: 200 },
      filter: { 'exists[parent]': false },
      sort: { field: 'position', order: 'ASC' },
      meta: {useEmbedded: true}
    }
  );

  if (isLoading) return null
  return(
    <FilterList label="Category" icon={<StoreIcon/>}>
      {categories?.map((category, index) => {
        return(
          <React.Fragment key={category.id}>
            <FilterListItem label={category.name} value={{category: category.id}} />
            {category.children.map((childCategory, i) => (
                <FilterListItem
                  key={childCategory.id}
                  label={childCategory.name}
                  value={{childCategory: childCategory.id}}
                  sx={{
                    '& .MuiTypography-root': {
                      marginLeft: 2
                    }
                  }}
                />
            ))}
          </React.Fragment>
        )
      })}
    </FilterList>
  )
}
export default CategoryFilter