import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {

    constructor(private bookmarkService: BookmarkService) {}

    @Get()
    getBookmarks(@GetUser('id') userId : number) {
        return this.bookmarkService.getBookmarks(userId)
    }

    @Get(':id')
    getBookmarkById(@GetUser('id') userId : number,@Param('id',ParseIntPipe) id : number) {
        return this.bookmarkService.getBookmarkById(userId,id)

    }

    @Post()
    createBookmark(@GetUser('id') userId : number,@Body() dto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(userId,dto)

    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId : number,@Param('id') bookmarkId: number,@Body() dto: EditBookmarkDto) {
        return this.bookmarkService.editBookmarkById(userId,bookmarkId,dto)

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId : number,@Param('id',ParseIntPipe) id : number) {
        return this.bookmarkService.deleteBookmarkById(userId,id)

    }
}
