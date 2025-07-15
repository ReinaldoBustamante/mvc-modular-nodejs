export interface UpdateCategoryProps {
  name?: string;
}

export class UpdateCategoryDto {
  public name: string | undefined;

  constructor(data: UpdateCategoryProps) {
    this.name = data.name;
  }
}
