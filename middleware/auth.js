export default function ({ store, redirect, route }) {
  const publicPages = ['/login', '/forgot-password']
  const authRequired = !publicPages.includes(route.path)
  
  if (authRequired && !store.state.user) {
    return redirect('/login')
  }
  
  if (store.state.user && publicPages.includes(route.path)) {
    return redirect('/')
  }
}