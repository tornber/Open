using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletController : MonoBehaviour
{
    [SerializeField] private Renderer ground;
    public float speed;
    private GameManager accSpeed;
    private Vector3 direction;

    public Vector3 Direction { get => direction; set => direction = value; }

    // Start is called before the first frame update
    void Start()
    {
        ground = GameObject.FindWithTag("groundtag").GetComponent<Renderer>();
        accSpeed = (GameManager) GameObject.Find("GameManager").GetComponent("GameManager");
    }

    // Update is called once per frame
    void Update()
    {
        shoot();
        CheckIfOutOfBorders();
    }


    private void shoot()
    {
        transform.position += direction * speed * this.accSpeed.AccBulletSpeed *  Time.deltaTime;
    }

    void CheckIfOutOfBorders()
    {
        if(!ground.bounds.Contains(new Vector3(transform.position.x,-2.0f, transform.position.z)))
        {
            Destroy(this.gameObject);
        }
    }

}
