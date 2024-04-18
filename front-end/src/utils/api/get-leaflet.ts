import { formatterURL } from '../../helpers/formatter-url';
import getApi from '../../helpers/get-api';
import { FetchLeaflet, Queryleaflet } from '../../types/leaflet';

const itemPerPage = 10;

export const fetchLeaflets = async (query: Queryleaflet): Promise<FetchLeaflet> => {
  const URL = 'http://localhost:3000/data?' +
    `id=${query.id?.trim()}` + 
    `&company=${encodeURIComponent(query.company?.trim().toLocaleUpperCase()|| '')}` +
    `&name=${query.name?.trim().toLocaleUpperCase() || ''}` +
    `&_sort=${query.sort || ''}` +
    `&_page=${query.page}` +
    `&_per_page=${itemPerPage}`
  ;
  const leafletResponse = await getApi(formatterURL(URL)) as FetchLeaflet;
  console.log(formatterURL(URL));
  return leafletResponse;
}
