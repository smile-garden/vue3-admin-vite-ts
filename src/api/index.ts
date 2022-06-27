import request from '@/utils/request';

export function login(data: {
  username: string,
  password: string,
}) {
  return request.post('/mock/927859/login', data);
}

export function getUserInfo() {
  return request.post('/mock/927859/userInfo');
}

export function getList(data: any) {
  return request.post('/mock/927859/list', data);
}

export function getSelectList(data: any) {
  return request.post('/mock/927859/select/list', data);
}

export function getRadarData(data: any) {
  return request.post('/mock/927859/radar', data);
}
