using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyController : MonoBehaviour 
{

    protected GameManager deadEnemies;

    protected void OnStart()
    {
        deadEnemies = (GameManager)GameObject.Find("GameManager").GetComponent("GameManager");
    }

    protected  virtual  void move()
    {

    }

}
