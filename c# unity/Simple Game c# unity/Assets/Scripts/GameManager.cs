using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{

    public GameObject player;
    private GameObject generatedPlayer;
    public GameObject enemy1;
    public GameObject enemy2;
    private EnemyOneController enemy1Controller;
    private EnemyTwoController enemy2Controller;
    public float enemy1SpawnTime;
    public float enemy2SpawnTime;
    private double deadCount;
    public double DeadCount { get => deadCount; set => deadCount = value; }
    private float accBulletSpeed = 1.0f;
    public float AccBulletSpeed { get => accBulletSpeed; set => accBulletSpeed = value; }
    double nextBulletAccNumber = 3;
    private float accTankSpeed = 1.0f;
    public float AccTankSpeed { get => accTankSpeed; set => accTankSpeed = value; }
    double nextTankAccNumber = 5;
    private bool changeTankSpeed = false;
    public bool ChangeTankSpeed { get => changeTankSpeed; set => changeTankSpeed = value; }

    void Start()
    {
        spawnPlayer();
        enemy1Controller = (EnemyOneController) this.enemy1.GetComponent("EnemyOneController");
        enemy2Controller = (EnemyTwoController) this.enemy2.GetComponent("EnemyTwoController");
    }

    void Update()
    {
        SpawnEnemy();
        Restart();
        LevelUp();
    }

    void Restart()
    {
        if (Input.GetKey(KeyCode.R))
        {
            SceneManager.LoadSceneAsync("Shualeduri", LoadSceneMode.Single);
        }
    }

    private void spawnPlayer()
    {
        generatedPlayer = Instantiate(player, new Vector3(0, 0, 0), Quaternion.Euler(0, 0, 0));
    }

    void SpawnEnemy()
    {
        if (Time.time >= enemy1SpawnTime - 1.0f && Time.time % enemy1SpawnTime < 0.01f)
        {
            Vector3 position = GetRandomEnemyPosition();
            Instantiate(enemy1,position,Quaternion.Euler(0,0,0));
        }
        if (Time.time >= enemy2SpawnTime - 1.0f && Time.time % enemy2SpawnTime < 0.01f)
        {
            Vector3 position = GetRandomEnemyPosition();
            Instantiate(enemy2, position, Quaternion.Euler(0, 0, 0));
        }
    }

    Vector3 GetRandomEnemyPosition()
    {
        Vector3 position = new Vector3(Random.Range(-45.0f, 45.0f), 0.0f, Random.Range(-45.0f, 45.0f));
        float distance = Vector3.Distance(position, generatedPlayer.transform.position);   
        if(distance >= 25)
        {
            return position;
        } else
        {
            GetRandomEnemyPosition();
        }
        return new Vector3(-45.0f,0,-45.0f);
    }

    void LevelUp()
    {
        if(this.DeadCount == this.nextBulletAccNumber) {
            this.AccBulletSpeed = this.AccBulletSpeed + 0.025f;
            this.nextBulletAccNumber = this.DeadCount + 3;
            if(this.enemy1SpawnTime != 0.5f) { 
                this.enemy1SpawnTime -= 0.25f;
            }
            enemy1Controller.Speed += 0.025f;
        }
        if(this.DeadCount == this.nextTankAccNumber)
        {
            this.AccTankSpeed = this.AccTankSpeed + 0.025f;
            this.ChangeTankSpeed = true;
            this.nextTankAccNumber = this.DeadCount + 5;
            if (this.enemy2SpawnTime != 0.5f)
            {
                this.enemy2SpawnTime -= 0.25f;
            }
            enemy2Controller.Speed += 0.05f;

        }
    }

}
