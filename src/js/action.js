// var url = 'http://123.207.168.112:10000';
// var url = 'http://localhost:8080';
 var url = 'http://192.168.199.139:8080';
$.fn.api.settings.api = {
  'staff login' : url+'/staff/login',
  'staff info' : url+'/staff/info',
  'staff logout' : url+'/staff/logout',
  'staff changePassword' : url+'/staff/changePassword',
  'staff search' : url+'/staff/search',
  'staff insert' : url+'/staff/insert',
  'staff update' : url+'/staff/update',
  'staff delete' : url+'/staff/delete',
  'shop getAll' : url+'/shop/getAll',
  'shop search' : url+'/shop/search',
  'shop listByPage' : url+'/shop/listByPage',
  'shop insert' : url+'/shop/insert',
  'shop update' : url+'/shop/update',
  'shop delByIds' : url+'/shop/delByIds',
  'stock search' : url+'/stock/search',
  'stock insert' : url+'/stock/insert',
  'stock update' : url+'/stock/update',
  'stock delete' : url+'/stock/delete',
  'stockType getAll' : url+'/stockType/getAll',
  'stockType search' : url+'/stockType/search',
  'stockType insert' : url+'/stockType/insert',
  'stockType update' : url+'/stockType/update',
  'stockType delete' : url+'/stockType/delete',
  'employee search' : url+'/employee/search',
  'employee insert' : url+'/employee/insert',
  'employee update' : url+'/employee/update',
  'employee listJobs' : url+'/employee/listJobs',
  'employee leave' : url+'/employee/leave',
  'projectType listTops' : url+'/projectType/listTops',
  'projectType listByTopType' : url+'/projectType/listByTopType',
  'projectType getAll' : url+'/projectType/getAll',
  'projectType search' : url+'/projectType/search',
  'projectType insert' : url+'/projectType/insert',
  'projectType update' : url+'/projectType/update',
  'projectType delete' : url+'/projectType/delete',
  'vipLevel insert' : url+'/memberLevel/insert',
  'vipLevel update' : url+'/memberLevel/update',
  'vipLevel delete' : url+'/memberLevel/delete',
  'vipLevel search' : url+'/memberLevel/search',
  'vipLevel getAll' : url+'/memberLevel/listAll',
  'vip insert' : url+'/member/insert',
  'vip update' : url+'/member/update',
  'vip delete' : url+'/member/delete',
  'vip search' : url+'/member/search',
  'project search' : url+'/project/search',
  'project insert' : url+'/project/insert',
  'project update' : url+'/project/update',
  'project delete' : url+'/project/delete',
  'project query' : url+'/project/query',
  'project listByProjectType' : url+'/project/listByProjectType',
  'appointment search' : url+'/appointment/search',
  'appointment insert' : url+'/appointment/insert',
  'appointment update' : url+'/appointment/update',
  'appointment cancel' : url+'/appointment/cancel',
  'appointment start' : url+'/appointment/start',
  'appointment finish' : url+'/appointment/finish',
  'appointment remind' : url+'/appointment/remind',
  'appointment listEmployeesByProject' : url+'/appointment/listEmployeesByProject',
  'record search' : url+'/consume/search',
  'record create' : url+'/consume/create',
  'record export' : url+'/consume/export',
};