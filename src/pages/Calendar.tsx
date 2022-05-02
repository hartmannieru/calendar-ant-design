import { Button, Layout, Modal, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import CalendarForm from '../components/CalendarForm';
import EventCalendar from '../components/EventCalendar';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICalendar } from '../models/ICalendar';

const Calendar: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {fetchGuests, createEvent, fetchEvents} = useActions();
  const {guest, events} = useTypedSelector(state => state.event);
  const {user} = useTypedSelector(state => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewEvent = (event: ICalendar) => {
    setModalVisible(false);
    createEvent(event);
  }

  return (
    <Layout>
      {/* {JSON.stringify(events)} */}
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setModalVisible(true)}>Add event</Button>
      </Row>
      <Modal
        title={"Add event"}
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <CalendarForm guests={guest} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Calendar;