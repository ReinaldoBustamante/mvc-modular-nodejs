export class CreateCategoryDto {
  public name: string;
  public budget: number;

  constructor(data: { name: string, budget: number }) {
    const { name, budget } = data;
    this.name = name;
    this.budget = budget
  }
}
