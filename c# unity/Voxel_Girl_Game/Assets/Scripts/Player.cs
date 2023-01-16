using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    Animator animator;
    Rigidbody rb;
    public float speed;
    public float jump;

    // Start is called before the first frame update
    void Start()
    {
        animator = GetComponentInChildren<Animator>();
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        Jump();
/*        bool isMoving = animator.GetBool("isWalking");*/
/*        bool isRunning = animator.GetBool("isRunning");*/
        bool isMovingPressed = Input.GetAxis("Vertical") != 0 || Input.GetAxis("Horizontal") != 0;
        bool isRunningPressed = Input.GetKey("left shift");
        if(isMovingPressed)
        {
            animator.SetTrigger("walking");
            /*print("isMoving true" + isMoving);*/
            Move(speed);
        }
        if(!isMovingPressed)
        {
            animator.ResetTrigger("walking");
            /*print("isMoving false" + isMoving);*/
        }
        if (isRunningPressed)
        {
            animator.SetTrigger("running");
            Move(speed * 2f);
        }
        if (!isMovingPressed || !isRunningPressed)
        {
            animator.ResetTrigger("running");
        }
    }

    void Move(float speed)
    {
        Vector3 movement = new Vector3(-Input.GetAxis("Vertical"), 0f, Input.GetAxis("Horizontal"));
        transform.position += movement * Time.deltaTime * speed;
        animator.SetBool("isWalking", true);
    }

    void Jump()
    {
        if(rb != null)
        {
            if(Input.GetKeyDown(KeyCode.Space))
            {
                rb.AddForce(Vector3.up * jump * Time.deltaTime, ForceMode.Impulse);
                animator.SetTrigger("jump");
            } else
            {
                animator.ResetTrigger("jump");
            }
        }
    }
}
