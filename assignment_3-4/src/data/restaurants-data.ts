export interface Restaurant {
  name: string;
  address: string;
  phone: string;
}

export const restaurants: Restaurant[] = [
  {
    name: '봉수육',
    address: '경기 수원시 장안구 율전로108번길 11 1층',
    phone: '0507-1460-0903',
  },
  {
    name: '청년밥상',
    address: '경기 수원시 장안구 서부로2136번길 10 1층',
    phone: '0507-1307-1822',
  },
];
