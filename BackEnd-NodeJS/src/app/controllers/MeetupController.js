import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const meetups = await Meetup.findAll({
            where: { user_id: req.userId },
            limit: 10,
            offset: (page - 1) * 10,
            order: ['date'],
            attributes: ['id', 'title', 'location', 'date'],
        });

        res.json(meetups);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required(),
        });

        if (!schema.isValid(req.body)) {
            res.status(401).json({ error: 'Validation fails' });
        }

        const { title, description, location, date } = req.body;

        if (isBefore(parseISO(date), new Date())) {
            return res
                .status(401)
                .json({ error: 'Past dates is not permitted' });
        }

        const meetup = await Meetup.create({
            user_id: req.userId,
            title,
            description,
            location,
            date,
        });

        return res.json(meetup);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            description: Yup.string(),
            location: Yup.string(),
            date: Yup.date(),
        });

        if (!schema.isValid(req.bod)) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        /**
         * Verify if meetup is this user
         */
        const { meetupId } = req.params;
        const meetup = await Meetup.findOne({
            where: { id: meetupId, user_id: req.userId },
        });

        if (!meetup) {
            return res
                .status(401)
                .json({ error: 'You can only edit your meetups' });
        }

        /**
         * Verify if edit is in past dates
         */
        if (isBefore(meetup.date, new Date())) {
            return res
                .status(401)
                .json({ error: 'You cannot edit this meetup' });
        }

        await meetup.update(req.body);
        return res.json(meetup);
    }

    async delete(req, res) {
        const { meetupId } = req.params;

        const meetup = await Meetup.findOne({
            where: { id: meetupId, user_id: req.userId },
        });

        if (!meetup) {
            return res
                .status(401)
                .json({ error: 'You can only delete your meetups' });
        }

        await meetup.destroy();

        return res.json({ message: 'Deleted sucessfull' });
    }
}

export default new MeetupController();