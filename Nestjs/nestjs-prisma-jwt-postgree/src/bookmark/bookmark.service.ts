import { ForbiddenException, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService)
    
    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId
            }
        })
    }

    getBookmarkById(userId: number, bookmarkId : number) {
        return this.prisma.bookmark.findFirst({
            where: {
                userId,
                id: bookmarkId
            }
        })
    }

    async createBookmark(userId: number, dto : CreateBookmarkDto) {
        const bookmark = await this.prisma.bookmark.create(
            { 
                data: {
                    userId,
                    ...dto
                }
            })
        return bookmark
    }

    async editBookmarkById(userId: number, bookmarkId: number,dto: EditBookmarkDto) {
        const bookmark : EditBookmarkDto = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException("bookmark with this id not found or Access denied")
        }
        return this.prisma.bookmark.update({where: {
            id: bookmarkId
        }, 
        data: {...dto}
        })
    }

    deleteBookmarkById(userId: number, bookmarkId: number) {
        const bookmark : EditBookmarkDto = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException("bookmark with this id not found or Access denied")
        }
        return this.prisma.bookmark.delete({
            where: {
                id: bookmarkId
            }
        })
    }
}
