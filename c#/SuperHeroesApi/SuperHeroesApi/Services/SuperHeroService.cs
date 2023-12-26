using Microsoft.AspNetCore.Mvc;
using SuperHeroesApi.Data;

namespace SuperHeroesApi.Services
{
    public class SuperHeroService : ISuperHeroService
    {

        private readonly DataContext _context;

        public SuperHeroService(DataContext context)
        {
                _context = context;
        }

        List<SuperHero> superHeroes = new List<SuperHero>
            {
                new SuperHero {Id=1,Name="Spider Man",FirstName="Peter",
                    LastName="Parker",Place="New york city"},
                new SuperHero {Id=2,Name="Iron man",FirstName="Tony",
                    LastName="Stark",Place="Malibu"},
            };

        async public Task<List<SuperHero>> AddHero([FromBody] SuperHero newHero)
        {
            _context.SuperHeroes.Add(newHero);
            await _context.SaveChangesAsync();
            var superHeroes = await _context.SuperHeroes.ToListAsync();
            return superHeroes;
        }

        async public Task<List<SuperHero>> DeleteHero(int id)
        {
            var hero = await _context.SuperHeroes.FindAsync(id);
            if (hero is null) return null;

            _context.SuperHeroes.Remove(hero);
            await _context.SaveChangesAsync();

            return await _context.SuperHeroes.ToListAsync();
        }

        async public Task<List<SuperHero>> GetAllHeroes() 
        {
            var superHeroes = await _context.SuperHeroes.ToListAsync();
            return superHeroes;
        }

        async public Task<SuperHero> GetHero(int id)
        {
            var hero = await _context.SuperHeroes.FindAsync(id);
            if (hero is null) return null;
            return hero;
        }

        async public Task<List<SuperHero>> UpdateHero(int id, SuperHero requstBody)
        {
            var hero = await _context.SuperHeroes.FindAsync(id);
            if (hero is null) return null;
            
            hero.Name = requstBody.Name;
            hero.FirstName = requstBody.FirstName;
            hero.LastName = requstBody.LastName;
            hero.Place = requstBody.Place;

            await _context.SaveChangesAsync();

            return await _context.SuperHeroes.ToListAsync();
        }
    }
}
