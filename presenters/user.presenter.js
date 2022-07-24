module.exports = {
    userPresenter: (user) => {
        return {
            _id: user._id,
            name: user.name,
            age: user.age,
            email: user.email
        }
    }
}