import { clinic } from './content/clinic.js';

const canonical = new URL(clinic.origin);

export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if ((url.hostname === canonical.hostname && url.protocol !== canonical.protocol) || url.hostname === `www.${canonical.hostname}`) {
      url.protocol = canonical.protocol;
      url.hostname = canonical.hostname;
      url.port = '';
      return Response.redirect(url.href, 308);
    }
    return env.ASSETS.fetch(request);
  },
};
