using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{

    public string playerName = "player_1";

    public float movementSpeed = 5.0f;

    public float jumpForce = 10.0f;

    private Rigidbody rb;

    // Start is called before the first frame update
    void Start()
    {
        print("Player name = " + playerName);
        rb = this.GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        movePlayer();
        playerJump();
    }

    private void movePlayer()
    {
        float vertical = Input.GetAxis("Vertical");
        float horizontal = Input.GetAxis("Horizontal");

        transform.position = new Vector3(transform.position.x,
            transform.position.y,
            transform.position.z + (vertical * movementSpeed * Time.deltaTime));

        transform.position = new Vector3(transform.position.x + (horizontal * movementSpeed * Time.deltaTime),
            transform.position.y,
            transform.position.z);
    }

    private void playerJump()
    {
        if(Input.GetKeyDown(KeyCode.Space))
        {
            if(rb != null)
            {
                rb.AddForce(new Vector3(0, 1, 0) * jumpForce);
            }
        }
    }

    private void OnCollisionEnter(Collision collision)
    {
        if(collision.gameObject.tag == "groundtag")
        {
            print("player grounded" + collision.gameObject.name);
        }
        
    }

    /*private void OnCollisionExit(Collision collision)
    {
        print("collision exit " + collision.gameObject.name);
    }

    private void OnCollisionStay(Collision collision)
    {
        print("collision stay " + collision.gameObject.name);
    }*/

    private void OnTriggerEnter(Collider collider)
    {
        print("trigger enter " + collider.gameObject.name);
    }

    private void OnTriggerExit(Collider collider)
    {
        print("trigger exit " + collider.gameObject.name);
    }

    private void OnTriggerStay(Collider collider)
    {
        print("trigger stay " + collider.gameObject.name);
    }
}
