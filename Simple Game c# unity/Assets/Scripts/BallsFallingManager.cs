using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BallsFallingManager : MonoBehaviour
{

    public GameObject fallingBallPrefab;

    private float spawnTimerCounter;

    public Vector2 spawnTimeRange;

    private float currentSpawnTime;

    public Transform ballsFallingSpawnObject;

    public Vector2 ballFallingPositionRange;

    public int ballsCountAtaTime;

    public Vector2 scaleRandomer;

    // Start is called before the first frame update
    void Start()
    {
        // create random range interval
        currentSpawnTime = Random.Range(spawnTimeRange.x, spawnTimeRange.y);
    }

    private void spawnBallInterval()
    {
        spawnTimerCounter += Time.deltaTime;
        if(spawnTimerCounter >= currentSpawnTime)
        {
            instantiateFallingBall();
            // create random range interval
            currentSpawnTime = Random.Range(spawnTimeRange.x, spawnTimeRange.y);
            spawnTimerCounter = 0;
        }
    }

    private void instantiateFallingBall()
    {
        for (int i = 0; i < ballsCountAtaTime; i++)
        {
            float scaleRand = Random.Range(scaleRandomer.x, scaleRandomer.y);
            float rand_x = Random.Range(ballFallingPositionRange.x, ballFallingPositionRange.y);
            float rand_z = Random.Range(ballFallingPositionRange.x, ballFallingPositionRange.y);
            GameObject ballClone = Instantiate(fallingBallPrefab, new Vector3(rand_x, ballsFallingSpawnObject.position.y, rand_z),
                Quaternion.Euler(0, 0, 0));
            ballClone.transform.localScale *= scaleRand;
        }
    }

    // Update is called once per frame
    void Update()
    {
        spawnBallInterval();
    }
}
