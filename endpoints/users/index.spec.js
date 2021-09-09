const handlers = require('./index');

describe('Endpoints', () => {
  describe('users', () => {
    describe('get', () => {
      it('resturns to users json', async () => {
        // se construye un mock para axios
        const axios = { get: jest.fn().mockResolvedValue({ data: 1 }) };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        await handlers({ axios }).get({}, res);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);
      });
    });
    describe('post', () => {
      it('creates a resource', async () => {
        const axios = { post: jest.fn().mockResolvedValue({ data: 1 }) };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
        const req = {
          body: 'request body',
        };
        await handlers({ axios }).post(req, res);
        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        expect(axios.post.mock.calls).toEqual([
          ['https://jsonplaceholder.typicode.com/users', 'request body'],
        ]);
      });
    });

    describe('put', () => {
      it('put resource', async () => {
        const axios = { put: jest.fn().mockResolvedValue({ data: 1 }) };
        const req = {
          body: 'request body',
          params: {
            id: 7,
          },
        };
        const res = {
          sendStatus: jest.fn(),
        };
        await handlers({ axios }).put(req, res);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.put.mock.calls).toEqual([
          ['https://jsonplaceholder.typicode.com/posts/7', 'request body'],
        ]);
      });
    });
    describe('delete', () => {
      it('delete element', async () => {
        const axios = { delete: jest.fn() };
        const req = {
          params: {
            id: 7,
          },
        };
        const res = {
          sendStatus: jest.fn(),
        };

        await handlers({ axios }).delete(req, res);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.delete.mock.calls).toEqual([
          ['https://jsonplaceholder.typicode.com/posts/7'],
        ]);
      });
    });
  });
});
