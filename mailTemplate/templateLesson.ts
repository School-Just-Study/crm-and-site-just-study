export const templateLesson = (
  title: string,
  body: string,
  linkCalendar: string
) => {
  return `
  <!doctype html>
<html xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <!--<![endif]-->
  <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <style type='text/css'>
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
  <!--[if !mso]><!-->
  <link href='https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700' rel='stylesheet' type='text/css'>
  <style type='text/css'>
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type='text/css'>
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style media='screen and (min-width:480px)'>
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }
  </style>
  <style type='text/css'>
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type='text/css'>
  </style>
</head>

<body style='word-spacing:normal;background-color:#E3F2FD;'>
  <div style='background-color:#E3F2FD;'>
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style='margin:0px auto;max-width:600px;'>
      <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
        <tbody>
          <tr>
            <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;'>
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class='mj-column-per-100 mj-outlook-group-fix' style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                  <tbody>
                    <tr>
                      <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                          <tbody>
                            <tr>
                              <td style='width:150px;'>
                                <img height='auto' src='https://storage.yandexcloud.net/sitejuststudy/full-logo.png' style='border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;' width='150' />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style='background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:15px;max-width:600px;'>
      <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#ffffff;background-color:#ffffff;width:100%;border-radius:15px;'>
        <tbody>
          <tr>
            <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;'>
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style='margin:0px auto;max-width:600px;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                  <tbody>
                    <tr>
                      <td style='direction:ltr;font-size:0px;padding:0;text-align:center;'>
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                        <div class='mj-column-per-100 mj-outlook-group-fix' style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                            <tbody>
                              <tr>
                                <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                  <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;font-weight:bold;line-height:150%;text-align:left;color:#555555;'>${title}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style='background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#ffffff;background-color:#ffffff;width:100%;'>
                  <tbody>
                    <tr>
                      <td style='direction:ltr;font-size:0px;padding:0;text-align:center;'>
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                        <div class='mj-column-per-100 mj-outlook-group-fix' style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='background-color:#ccf1db;vertical-align:top;' width='100%'>
                            <tbody>
                              <tr>
                                <td align='center' style='font-size:0px;padding:20px 20px 0;word-break:break-word;'>
                                  <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#555555;'>Рекомендуем добавить напоминие о всех занятиях в календарь</div>
                                </td>
                              </tr>
                              <tr>
                                <td align='center' vertical-align='middle' style='font-size:0px;padding:15px;word-break:break-word;'>
                                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:separate;line-height:100%;'>
                                    <tbody>
                                      <tr>
                                        <td align='center' bgcolor='#0c51c4' role='presentation' style='border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#0c51c4;' valign='middle'>
                                          <a href='webcal://${linkCalendar}' style='display:inline-block;background:#0c51c4;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:uppercase;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;' target='_blank'> Добавить в календарь </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style='background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#ffffff;background-color:#ffffff;width:100%;'>
                  <tbody>
                    <tr>
                      <td style='direction:ltr;font-size:0px;padding:15px 0 0;text-align:center;'>
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                        <div class='mj-column-per-100 mj-outlook-group-fix' style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                            <tbody>
                              <tr>
                                <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                  <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:150%;text-align:left;color:#555555;'>${body}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style='margin:0px auto;max-width:600px;'>
      <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
        <tbody>
          <tr>
            <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;'>
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class='mj-column-per-100 mj-outlook-group-fix' style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                  <tbody>
                    <tr>
                      <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:100px;line-height:1;text-align:center;color:#555555;'>😉</div>
                      </td>
                    </tr>
                    <tr>
                      <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;font-weight:bold;line-height:1;text-align:center;color:#757575;'>See you soon</div>
                      </td>
                    </tr>
                    <tr>
                      <td align='center' style='font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;line-height:1;text-align:center;color:#757575;'>Just Study Team</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style='margin:0px auto;max-width:600px;'>
      <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
        <tbody>
          <tr>
            <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;'>
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class='mj-column-per-100 mj-outlook-group-fix' style='font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                  <tbody>
                    <tr>
                      <td style='background-color:#ffffff;border-radius:15px;vertical-align:top;padding:15px;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                          <tbody>
                            <tr>
                              <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;line-height:1;text-align:center;color:#757575;'>Есть вопросы?</div>
                              </td>
                            </tr>
                            <tr>
                              <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#757575;'>Пишите нам в чате личного кабинета на портале или в Telegram</div>
                              </td>
                            </tr>
                            <tr>
                              <td align='center' vertical-align='middle' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:separate;line-height:100%;'>
                                  <tbody>
                                    <tr>
                                      <td align='center' bgcolor='#0c51c4' role='presentation' style='border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#0c51c4;' valign='middle'>
                                        <a href='https://t.me/juststudy_help_bot' style='display:inline-block;background:#0c51c4;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;' target='_blank'> Написать в поддержку </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
  `;
};
