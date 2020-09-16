const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Getting all subcribers
router.get('/', async (req,res) => {
    try {
        const subsribers = await Subscriber.find()  //will get all the subscribers
        res.json(subsribers)
    } catch (error) {
        res.status(500).json({ message:error.message})
    }
})

//Getting one subcribers
router.get('/:id', getSubscriber , async(req,res) => {
    res.send(res.subscriber.name)
})

//Creating one subcribers
router.post('/', async(req,res) => {
    const subriber = new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.subscriberToChannel
    })
    try {
        const newSubscriber = await subriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

//Updating one subcribers
router.patch('/:id', getSubscriber, async(req,res) => {
    if(req.body.name!=null)
        res.subscriber.name = req.body.name
    if(req.body.subscriberToChannel!=null)
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

//Deleting one subscriber
router.delete('/:id', getSubscriber,  async(req,res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'Deleted Subscriber'})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


async function getSubscriber(req,res,next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null)
            return res.status(404).json({message:'Cannot find subscriber'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router