import {FilterLiveSearch, useListContext} from 'react-admin';
import {Card, CardContent} from '@mui/material';
import React from 'react';
import BrandFilter from './BrandFilter';
import CategoryFilter from './CategoryFilter';


export default function ProductFilter() {

  // const {setFilters, filterValues} = useListContext();

  return (
    <Card sx={{order: -1, mr: 2, mt: 6, width: 300}}>
      <CardContent>
        <FilterLiveSearch source="title" label="Search by title" fullWidth={true} />
        {/* <BrandFilter /> */}
        <CategoryFilter />
      </CardContent>
    </Card>
  );
}