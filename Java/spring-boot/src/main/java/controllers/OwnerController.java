package controllers;

import services.OwnerService;

@RestController
public class OwnerController {

    @Autowired
    private OwnerService service;

    @PostMapping("/api/addOwner")
    public entities.Owner addOwner(@RequestBodyy entities.Owner owner) {
        return service.saveOwner(owner);
    }

    @GetMapping("/api/owners")
    public List<entities.Owner> getOwners() {
        return service.getOwners();
    }

    @PutMapping("/api/updateOwner")
    public entities.Owner updateOwner(@RequestBody entities.Owner owner) {
        return service.updateOwner(owner);
    }

    @DeleteMapping("/api/deleteOwner/{id}")
    public String deleteOwner(@PathVariable long id) {
        return service.deleteOwner(id);
    }
}
