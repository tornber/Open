using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Plane : MonoBehaviour
{

    public MeshRenderer meshRenderer;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        ChangeColor();
    }

    private void ChangeColor()
    {
        if (Input.GetKey(KeyCode.C))
        {
            meshRenderer.materials[0].color = Color.red;
        }
        if (Input.GetKey(KeyCode.H))
        {
            meshRenderer.materials[0].color = Color.blue;
        }
    }
}
