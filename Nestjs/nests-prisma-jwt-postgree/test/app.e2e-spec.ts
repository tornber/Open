import { INestApplication } from "@nestjs/common"
import {Test} from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { PrismaService } from "../src/prisma/prisma.service"
import * as pactum from 'pactum'
import { AuthDto } from "../src/auth/dto"
import { CreateBookmarkDto } from "src/bookmark/dto"


describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication()
    await app.init()
    // await new Promise(resolve => setTimeout(resolve, 5000)); 
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleandDb()
  },10000)
  
  afterAll(() => {
    app.close()
  })
  
  describe("Auth", () => {
    const dto: AuthDto = {
      email: "anson@gmail.com",
      password: "anson123"
    }
    describe("signUp", () => {
      it("Should throw error if email is empty", () => {
        
        return pactum.spec()
        .post("/auth/signup")
        .withBody({password: dto.password})
        .expectStatus(400)
      }) 
      it("Should throw error if email is empty", () => {
        
        return pactum.spec()
        .post("/auth/signup")
        .withBody({email: dto.email})
        .expectStatus(400)
      }) 
      it("Should throw error if no body", () => {
        
        return pactum.spec()
        .post("/auth/signup")
        .expectStatus(400)
      }) 
      it("Should sign up", () => {
        
        return pactum.spec()
        .post("/auth/signup")
        .withBody(dto)
        .expectStatus(201)
      }) 
    })
    describe("login", () => {
      it("should sign in", () => {
        return pactum.spec()
        .post("/auth/signin")
        .withBody(dto)
        .expectStatus(200)
        .stores("userAccessToken","access_token")

      })
      it("Should throw error if email is empty", () => {
        
        return pactum.spec()
        .post("/auth/signin")
        .withBody({password: dto.password})
        .expectStatus(400)
      }) 
      it("Should throw error if email is empty", () => {
        
        return pactum.spec()
        .post("/auth/signin")
        .withBody({email: dto.email})
        .expectStatus(400)
      }) 
      it("Should throw error if no body", () => {
        
        return pactum.spec()
        .post("/auth/signin")
        .expectStatus(400)
      }) 
    })

  })
  describe("User", () => {
    describe("Get User", () => {
      it("Should get current user", () => {
        
        return pactum.spec()
        .get("/user/me")
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}'
        })
        .expectStatus(200)
      }) 
    })
    describe("Edit User", () => {
      const dto = {
        firstname: "vladimir",
        email: "vlad@codewithvlad.com"
      }
      it("Should update user", () => {
        return pactum.spec()
        .patch("/user")
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}'
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.firstname)
        .expectBodyContains(dto.email)
        .inspect()
      }) 
    })
  })
  describe("Bookmark", () => {
    describe("Get Empty Bookmarks", () => {
      it("Should update user", () => {
        return pactum.spec()
        .get("/user")
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}'
        })
        .expectStatus(200)
        .expectBody([])
    })
    describe("Create Bookmark", () => {
      const dto : CreateBookmarkDto = {
        title: "First Bookmark",
        links: "youtube.com"
      }
      it("Should update user", () => {
        return pactum.spec()
        .post("/user")
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}'
        })
        .withBody(dto)
        .expectStatus(201)
        .stores("bookmarkId",'id')
    })
    describe("Should Get Bookmarks", () => {
      it("should get bookmarks ", () => { 
      return pactum.spec()
      .get("/user")
      .withHeaders({
        Authorization: 'Bearer $S{userAccessToken}'
      })
      .expectStatus(200)
      .expectJsonLength(1)
      })
    })
    describe("Get Bookmark by ID", () => {
      it("should get bookmark by id ", () => { 
        return pactum.spec()
        .get("/user/{id}")
        .withPathParams('id','$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}'
        })
        .expectStatus(200)
        .expectBodyContains('$S{bookmarkId}')
        .expectJsonLength(1)
        })
    })
    describe("Edit Bookmark", () => {
      const dto : EditBookmarkDto = {
        "description": "tutorial"
      }
      it("should edit bookmark by id ", () => { 
        return pactum.spec()
        .patch("/user/{id}")
        .withPathParams('id','$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}'
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.title)
        .expectBodyContains(dto.description)
        })
    })
    describe("Delete Bookmark", () => {
      it("should delete bookmark by id ", () => { 
        return pactum.spec()
        .delete("/user/{id}")
        .withPathParams('id','$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}'
        })
        .expectStatus(204)
        })
    })
  })
  
})