using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SuperHeroesApi.Services;

namespace SuperHeroesApi.s
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperHeroController : ControllerBase
    {

        private readonly ISuperHeroService _superHeroService;
        public SuperHeroController(ISuperHeroService superHeroService)
        {
            this._superHeroService = superHeroService;
        }

        List<SuperHero> superHeroes = new List<SuperHero>
            {
                new SuperHero {Id=1,Name="Spider Man",FirstName="Peter",
                    LastName="Parker",Place="New york city"},
                new SuperHero {Id=2,Name="Iron man",FirstName="Tony",
                    LastName="Stark",Place="Malibu"},
            };


        [HttpGet]
        public async Task<ActionResult<List<SuperHero>>> GetAllHeroes()
        {            
            return Ok(await _superHeroService.GetAllHeroes());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SuperHero>> GetHero(int id)
        {
            var result = _superHeroService.GetHero(id);
            if (result is null) return NotFound("hero with that id does not exist");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<SuperHero>>> AddHero([FromBody]SuperHero newHero)
        {
            try
            { 
                var result = _superHeroService.AddHero(newHero);
                return Ok(result);
            } catch (Exception ex) 
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<List<SuperHero>>> UpdateHero(int id, SuperHero requstBody)
        {
            var  result = _superHeroService.UpdateHero(id, requstBody);
            if (result is null) return NotFound("hero with that id does not exist");
            return Ok(result);

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<List<SuperHero>>> DeleteHero(int id)
        {
            var result = _superHeroService.DeleteHero(id);
            if (result is null) return NotFound("hero with that id does not exist");
            return Ok(result);
        }
    }
}
