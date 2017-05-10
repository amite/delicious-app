const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
  res.render('index', {
     title: 'Home Page Store'
  })
}

exports.addStore = (req, res) => {
  res.render('editStore', {
    title: 'Add Store'
  })
}

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  res.render('editStore', { title: `Edit ${store.name}`, store})
}

exports.updateStore = async (req, res) => {
  req.body.location.type = 'Point'
  const store = await Store.findOneAndUpdate({ _id: req.params.id}, req.body,
  {
    new: true,
    runValidators: true
  }).exec()
  req.flash('success', `Successfully updated ${store.name}. <a href="/stores/${store.slug}">view store<a/>`)
  res.redirect(`/stores/${store._id}/edit`)
}

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body).save())
  req.flash('success', `Successfully created ${store.name}. Would you like to create a review?`)
  res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
  const stores = await Store.find()
  res.render('stores', { title: 'Stores', stores })
}

