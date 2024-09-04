import {z} from 'zod';


const schema = z.object({
  name:z.string().min(1,'* Name is required'),
  email:z.string().email('* Invalid email address'),
  comment:z.string().min(20,'* Message is too short').max(100,'*Messages are too large'),
});

export default schema;
