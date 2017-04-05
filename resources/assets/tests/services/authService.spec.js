describe('Auth. Service', () => {

  var authService, userService, $httpBackend;

  beforeEach( () => {
    module('vexposition');

    inject( (_authService_, _userService_, _$httpBackend_) => {
      authService = _authService_;
      userService = _userService_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('should not auth', () => {
    expect(authService.isAuth()).toBe(false);
  });

  it('should not pass for empty or invalid role', () => {
    expect(authService.hasRoles()).toBe(false);
    expect(authService.hasRoles(null)).toBe(false);
  });

  it('should not has test, test2 roles', () => {
    expect(authService.hasRoles('test')).toBe(false);
    expect(authService.hasRoles('test', 'test2')).toBe(false);
  });

  it('should contain test, test2 roles', (done) => {
    $httpBackend.whenGET('/api/user')
      .respond({ roles: ['test', 'test2', 'test3'] });

    userService.loadUserData().then((d) => {
      expect(authService.hasRoles('test')).toBe(true);
    }).finally(done);

    $httpBackend.flush();
  });

  it('should not contains test, test4 roles', (done) => {
    $httpBackend.whenGET('/api/user')
      .respond({ roles: ['test', 'test2', 'test3'] });

    userService.loadUserData().then(() => {
      expect(authService.hasRoles('test', 'test4')).toBe(true);
    }).finally(done);

    $httpBackend.flush();
  });
});
