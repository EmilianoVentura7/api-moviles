const { Task } = require('../models');

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await Task.create({ title, description, userId: req.userId });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.userId } });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching tasks', error });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const task = await Task.findOne({ where: { id, userId: req.userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        await task.save();

        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
};