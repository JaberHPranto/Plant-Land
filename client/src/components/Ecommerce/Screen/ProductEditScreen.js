import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../../../constants/productConstants'
import { fetchProductById, updateProduct } from '../../../redux/actions/productActions'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'
import { toastSuccessMessage } from '../ToastMessage'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate


  useEffect(() => {
      if (successUpdate) {
          dispatch({ type: PRODUCT_UPDATE_RESET })
          toastSuccessMessage("Product Updated")
          history.push("/admin/productlist")

      } else {
        if (!product.name || product._id !== productId) {
            dispatch(fetchProductById(productId))
        } else {   
          setName(product.name)
          setDescription(product.description)
          setCategory(product.category)
          setImage(product.image)
          setPrice(product.price)
          setCountInStock(product.countInStock)
        }
      }

  }, [dispatch,product,productId,successUpdate,history])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({
          _id: product._id,name,description,image,category,price,countInStock
      }))
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      }
      const { data } = await axios.post(`/api/uploads`, formData, config)
      console.log(data);
      setImage(data)
      setUploading(false)

    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Write Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                placeholder='Enter Category'
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='image'>
              <Form.Label>Enter Image URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              
              <Form.File
                  id='image-file'
                  custom
                  onChange={handleFileUpload}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
                              
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
                              
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>                              
            <Button type='submit' className='bg-col-primary auth-btn'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen