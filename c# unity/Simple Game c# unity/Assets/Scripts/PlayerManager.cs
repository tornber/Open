using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerManager : MonoBehaviour
{

    public GameObject playerPrefabInstance;

    public Transform playerSpawnObject;

    public float randomSize;

    GameObject playerObject;

    // Start is called before the first frame update
    void Start()
    {
        createPlayer();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    
    private void createPlayer()
    {
        playerObject = Instantiate(playerPrefabInstance,
                                        playerSpawnObject.position,
                                        Quaternion.Euler(0, 180, 0));
    }
}
