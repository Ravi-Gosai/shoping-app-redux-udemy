import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_product = [
  {
    id : 'p1',
    price : 55,
    title : 'book 1',
    description : 'book is best'
  },
  {
    id : 'p2',
    price : 4,
    title : 'book 2',
    description : 'book is best'
  },
  {
    id : 'p3',
    price : 23,
    title : 'book 3',
    description : 'book is best hhhh'
  },
  {
    id : 'p4',
    price : 15,
    title : 'book 4',
    description : 'book is best hhh'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_product.map((pruduct)=><ProductItem key={pruduct.id} {...pruduct} ></ProductItem>)}
      </ul>
    </section>
  );
};

export default Products;
