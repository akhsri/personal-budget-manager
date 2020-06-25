import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryDto } from './dto/category.dto';
import { User } from '../auth/user.entity';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository,
    ) { }

    async addCategory(categoryDto: CategoryDto, user: User): Promise<Category> {
        return this.categoryRepository.addCategory(categoryDto, user)
    }

    async getCategories(user: User): Promise<Category[]> {
        return this.categoryRepository.getCategories(user);
    }
}
