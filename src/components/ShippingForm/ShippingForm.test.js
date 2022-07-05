import React from 'react';
import ShippingForm from './ShippingForm';
import { fireEvent, screen, render, waitFor, within } from '../../test-utils'




describe('ShippingForm Tests', () => {

    const onSubmit = jest.fn()

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        areaCode: '',
    }


    test('Expect form to render', () => {

        render(<ShippingForm defaultValues={defaultValues} onSubmit={onSubmit} />);

        expect(getFirstName()).toBeInTheDocument();
        expect(getLastName()).toBeInTheDocument();
        expect(getAddress1()).toBeInTheDocument();
        expect(getAddress2()).toBeInTheDocument();
        expect(getCity()).toBeInTheDocument();
        expect(getState()).toBeInTheDocument();
        expect(getAreaCode()).toBeInTheDocument();
        expect(getEmail()).toBeInTheDocument();
        expect(getPhone()).toBeInTheDocument();
        expect(getContinueButton()).toBeInTheDocument();
    });

    test('Expect submit with valid inputs', async () => {

        render(<ShippingForm defaultValues={defaultValues} onSubmit={onSubmit} />);

        fireEvent.change(getFirstName(), { target: { value: 'Shirley' } });
        fireEvent.change(getLastName(), { target: { value: 'Temple' } });
        fireEvent.change(getAddress1(), { target: { value: '1500 Pennsylvania Ave' } });
        fireEvent.change(getAddress2(), { target: { value: 'Unit 2B' } });
        fireEvent.change(getCity(), { target: { value: 'Anchorage' } });
        fireEvent.click(getState());
        const autocomplete = screen.getByRole('combobox')
        const stateInput = within(autocomplete).getByRole('textbox')
        autocomplete.focus()
        fireEvent.change(stateInput, { target: { value: 'Alaska' } })
        fireEvent.change(getAreaCode(), { target: { value: '55408' } });
        fireEvent.change(getEmail(), { target: { value: 'stemps@gmail.com' } });
        fireEvent.change(getPhone(), { target: { value: '9527181887' } });

    })

});

const getFirstName = () => {
    return screen.getByRole('textbox', {
        name: /first name/i
    })
}

const getLastName = () => {
    return screen.getByRole('textbox', {
        name: /last name/i
    })
}

const getAddress1 = () => {
    return screen.getByRole('textbox', {
        name: /address line 1/i
    })
}

const getAddress2 = () => {
    return screen.getByRole('textbox', {
        name: /address line 2/i
    })
}

const getCity = () => {
    return screen.getByRole('textbox', {
        name: /city/i
    })
}

const getState = () => {
    return screen.getByRole('combobox');
}

const getAreaCode = () => {
    return screen.getByRole('textbox', {
        name: /zip code/i
    })
}

const getEmail = () => {
    return screen.getByRole('textbox', {
        name: /email/i
    })
}

const getPhone = () => {
    return screen.getByRole('textbox', {
        name: /phone/i
    })
}

const getContinueButton = () => {
    return screen.getByRole('button', {
        name: /continue to payment/i
    })
}