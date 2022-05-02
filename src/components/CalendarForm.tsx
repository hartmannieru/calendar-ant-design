import {Button, DatePicker, Form, Input, Row} from 'antd';
import {Select} from 'antd';
import { Moment } from 'moment';
import { FC, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICalendar } from '../models/ICalendar';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
  guests: IUser[],
  submit: (event: ICalendar) =>  void,
}

const CalendarForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<ICalendar>({
    author: '',
    date: '',
    description: '',
    guest: ''
  } as ICalendar);

  const {user} = useTypedSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({...event, date: formatDate(date.toDate())})
    }
  }

  const submitForm = () => {
    props.submit({...event, author: user.username});
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required()]}
        >
        <Input 
          onChange={(e) => setEvent({...event, description: e.target.value})}
          value={event.description} 
        />
      </Form.Item>
      <Form.Item
        label="Event date"
        name="date"
        rules={[rules.required(), rules.isDateAfter("Can't create an event in the past")]}
      >
        <DatePicker 
          onChange={(date) => selectDate(date)}
        />
      </Form.Item>
      <Form.Item
        label="Выберите гостя"
        name="guest"
        rules={[rules.required()]}
      >
      <Select onChange={(guest: string) => setEvent({
        ...event, guest
      })}>
          {props.guests.map(guest =>
              <Select.Option key={guest.username} value={guest.username}>
                  {guest.username}
              </Select.Option>
          )}
      </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default CalendarForm;