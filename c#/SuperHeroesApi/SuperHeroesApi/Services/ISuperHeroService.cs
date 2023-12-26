using Microsoft.AspNetCore.Mvc;

namespace SuperHeroesApi.Services
{
    public interface ISuperHeroService
    {

        Task<List<SuperHero>> GetAllHeroes();
        Task<SuperHero> GetHero(int id);
        Task<List<SuperHero>> AddHero([FromBody] SuperHero newHero);
        Task<List<SuperHero>> UpdateHero(int id, SuperHero requstBody);
        Task<List<SuperHero>> DeleteHero(int id);
    }
}
