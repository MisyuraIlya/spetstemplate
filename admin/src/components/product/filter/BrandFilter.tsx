import {FilterList, FilterListItem, useGetList} from 'react-admin';
import StoreIcon from '@mui/icons-material/Store';
import React from 'react';

const BrandFilter = () => {
  const { data: brands, total, isLoading } = useGetList(
    'brands',
    {
      pagination: { page: 1, perPage: 200 },
      sort: { field: 'position', order: 'ASC' },
    }
  );

  const getFontSize = () => {
    return Math.floor(Math.random() * 10) + 10;
  }

  if (isLoading) return null
  return(
    <FilterList
      label="Brand"
      icon={<StoreIcon/>}
      sx={{
        '& .MuiListItem-root': {
          display: 'inline-block',
          width: 'auto',
        },
        '& .MuiButtonBase-root': {
          padding: '4px 8px !important',
          borderRadius: '18px'
        }
      }}
    >
      {brands?.map((brand, index) => (
        <FilterListItem
          key={index}
          label={brand.name}
          value={{brand: brand.id}}
          sx={{
            '& .MuiTypography-root': {
              fontSize: `${getFontSize()}px`
            }
          }}
        />
      ))}
    </FilterList>
  )
}
export default BrandFilter