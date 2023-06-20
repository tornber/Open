package services;

import repositories.OwnerRepository;

public class OwnerService {
    @Autowired
    private OwnerRepository repository;

    public entities.Owner saveOwner(entities.Owner owner) {
        return repository.save(owner);
    }

    public List<entities.Owner> getOwners() {
        return repository.findAll();
    }
    public entities.Owner updateOwner(entities.Owner owner) {
        entities.Owner existingOwner = repository.findById(owner.getId());
        existingOwner.setName(owner.getName());
        existingOwner.setBuildings(owner.getBuildings());
        return existingOwner;
    }

    public String deleteOwner(long id) {
        repository.deleteById(id);
        return "owner deleted with id " + id;
    }

}
