export class CreateCategoryDto {
  public name: string;

  constructor(data: { name: string }) {
    const { name } = data;
    this.name = name;
  }
}
