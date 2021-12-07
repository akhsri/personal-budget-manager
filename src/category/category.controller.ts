import { Controller, Post, Body, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from "./category.entity";
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @Post('/create')
    addCategory(@Body(ValidationPipe)
    categoryDto: CategoryDto,
        @GetUser() user: User,
    ): Promise<Category> {
        return this.categoryService.addCategory(categoryDto, user)
    }

    @Get()
    getCategories(
        @GetUser() user: User
    ): Promise<Category[]> {
        return this.categoryService.getCategories(user);
    }


}
