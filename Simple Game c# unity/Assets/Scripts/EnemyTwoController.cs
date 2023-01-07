using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyTwoController : EnemyController 
{
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
    }

    protected override void move()
    {
        Transform player = GameObject.FindWithTag("Player").GetComponent<Transform>();
        transform.position = Vector3.MoveTowards(transform.position, player.position, Speed);
    }

    void OnCollisionEnter(Collision collision)
    {
        if(collision.gameObject.tag == "Bullet")
        {
            base.deadEnemies.DeadCount = base.deadEnemies.DeadCount + 1;
            Destroy(collision.gameObject);
            Destroy(this.gameObject);
        }
    }
}
