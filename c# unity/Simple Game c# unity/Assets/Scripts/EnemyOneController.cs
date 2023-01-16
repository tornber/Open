using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyOneController : EnemyController
{

    private Vector3 targetPosition;
    bool hasTarget = false;
    int health = 0;
    [SerializeField]
    private float speed;
    public float Speed { get => speed; set => speed = value; }

    // Start is called before the first frame update
    void Start()
    {
        base.OnStart();
    }

    // Update is called once per frame
    void Update()
    {
        move();
        CheckIfOnTarget();
        CheckIfDead();
    }
    
    protected override void move()
    {
        if (hasTarget == false)
        {
            GetRandomPosition();
        }

        transform.position = Vector3.MoveTowards(transform.position, targetPosition, Speed);
    }

    void GetRandomPosition()
    {
        Vector3 position = new Vector3(Random.Range(-45.0f, 45.0f), 0.0f, Random.Range(-45.0f, 45.0f));
        targetPosition = position;
        hasTarget = true;
    }

    void CheckIfOnTarget()
    {
        float distance = Vector3.Distance(transform.position, targetPosition);
        if(distance <= 10)
        {
            hasTarget = false;
        }
    }

    void OnCollisionEnter(Collision collision)
    {
        if(collision.gameObject.tag == "Bullet")
        {
            Destroy(collision.gameObject);
            health++;
        }
    }

    void CheckIfDead()
    {
        if(health == 2)
        {
            health = 0;
            base.deadEnemies.DeadCount = base.deadEnemies.DeadCount + 1;
            Destroy(this.gameObject);
        }
    }

}
