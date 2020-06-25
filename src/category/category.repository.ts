import { Repository, EntityRepository } from "typeorm";
import { Category } from "./category.entity";
import { CategoryDto } from "./dto/category.dto";
import { User } from "../auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>{

    async addCategory(cateoryDto: CategoryDto, user: User): Promise<Category> {

        const { categoryName } = cateoryDto;

        const category = new Category();
        category.categoryName = categoryName;
        category.userId = user.id;
        try {
            await category.save();
        } catch (error) {
            console.log("ERROR: ", error);
            throw new InternalServerErrorException();
        }
        return category;
    }

    async getCategories(
        user: User
    ): Promise<Category[]> {
        return this.find({ where: { userId: user.id } });
    }
}