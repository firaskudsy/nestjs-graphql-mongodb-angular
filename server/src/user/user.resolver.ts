import { UserService } from './user.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './dto/user.dto';
import { TokenType } from '../token/token.dto';
import { AuthGuard } from '../token/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }

    @Query(() => String)
    async helloUser() {
        return 'hello from User';
    }

    @Query(() => [UserType])
    @UseGuards(AuthGuard)
    async user() {
        return this.userService.findAll();
    }


    @Query(() => TokenType)
    async login(@Args('email') email: string, @Args('password') password: string) {
        return this.userService.login(email, password);
    }


    @Mutation(() => UserType)
    async createUser(@Args('email') email: string, @Args('password') password: string, @Args('username') username: string) {
        return this.userService.create(email, password, username);
    }
}
