using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EventFunctions : MonoBehaviour
{
    [SerializeField] Rigidbody redCube;
    [SerializeField] GameObject orangeCube;
    [SerializeField] GameObject prefabToSpawn;
    [SerializeField] GameObject greenCube;
    [SerializeField] GameObject blueCube;
    Vector3 prevScale;
    Vector3 position;


    public void Jump()
    {
        redCube.AddForce(Vector3.up * 500);
    }

    public void Disapper()
    {
        position = orangeCube.transform.position;
        orangeCube.SetActive(false);
        Invoke("CreateSphere", 3.0f);
    } 

    public void CreateSphere()
    {
        Instantiate(prefabToSpawn, position, Quaternion.identity);
    }

    public void ChangeScale()
    {
        prevScale = greenCube.transform.localScale;
        greenCube.transform.localScale /= 1.05f;
        Invoke("ResetScale", 1.0f);
    }

    public void ResetScale()
    {
        greenCube.transform.localScale = prevScale;
    }
    
    public void replaceBox()
    {
        blueCube.SetActive(false);
        blueCube.transform.position += new Vector3(0f, 0f, 8f);
        blueCube.SetActive(true);
    }
}
