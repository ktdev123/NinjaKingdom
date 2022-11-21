# Global state

[src/store.ts](store.ts)

In each input component, use the store as follow to get the value and update it:

```tsx
const [value, setValue] = useInput(/* from props */ key);
```

# Oauth login flow

1. call `http://server-url:4000/auth/{provider}`
2. successful login will redirect to frontend's `/auth/{provider}/callback?id=...`
3. set the `id` to the store
4. redirect to `/login`

```tsx
import { login } from '@/utils'
...
login('twitter')
login('discord')
```