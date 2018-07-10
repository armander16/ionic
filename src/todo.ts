export class Todo {
  id: number;
  plu: string = '';
  name: string = '';
  price: number;
  decs: string = ''
  key: string = '';
  lote: string = 'toto';
  complete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
