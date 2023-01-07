using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TankPlayer : MonoBehaviour
{
    private Camera mainCamera;
    private float startY;
    private Vector3 direction;
    public Transform bulletStartPos;
    public GameObject bullet;
    public float speed;
    private GameManager accSpeed;

    // Start is called before the first frame update
    void Start()
    {
        mainCamera = Camera.main;
        startY = transform.position.y;
        accSpeed = (GameManager) GameObject.Find("GameManager").GetComponent("GameManager");
    }

    // Update is called once per frame
    void Update()
    {
        Move();
        mouseLook();
        shoot();
    }

    void Move()
    {
        float z = 0;
        float x = 0;
        if (accSpeed.ChangeTankSpeed)
        {
            accSpeed.ChangeTankSpeed = false;
            speed *= accSpeed.AccTankSpeed;
        }

        if (Input.GetKey(KeyCode.W))
        {
            z = speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.S))
        {
            z = -(speed * Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.D))
        {
            x = speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.A))
        {
            x = -(speed * Time.deltaTime);
        }

        Vector3 movement = new Vector3(transform.position.x + x, transform.position.y, transform.position.z + z);
        transform.position = movement;

    }

    private void mouseLook()
    {
        Vector3 mousePosition = Input.mousePosition;

        Vector3 newPosition = mainCamera.ScreenToWorldPoint(mousePosition);

        direction = newPosition - transform.position;

        direction = direction.normalized;

        Quaternion lookRotation = Quaternion.LookRotation(new Vector3(direction.x,0, direction.z));

        transform.rotation = lookRotation;
    }

    private void shoot()
    {
        if (Input.GetMouseButtonDown(0))
        {
            GameObject bulletClone = Instantiate(bullet, bulletStartPos.position, Quaternion.Euler(0, 0, 0));
            BulletController bulletController = bulletClone.GetComponent<BulletController>();
            if (bulletController != null)
            {
                bulletController.Direction = new Vector3(direction.x, 0, direction.z).normalized;
            }
        }
    }

    void OnCollisionEnter(Collision collision)
    {
        if(collision.gameObject.tag == "Enemy2" || collision.gameObject.tag == "Enemy1")
        {
            this.gameObject.SetActive(false);
            Destroy(collision.gameObject);
        }
    }
}
